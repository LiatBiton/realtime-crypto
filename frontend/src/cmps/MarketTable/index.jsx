import React from 'react';
import { connect } from "react-redux";
import { io } from "socket.io-client";
import { DataGrid } from '@mui/x-data-grid';
import { getAllSymbols, getData, removeSymbol } from '../../services/liveData.service'
import { DetailsModal } from '../DetailsModal/index.jsx'
import { MessageModal } from '../MessageModal/index.jsx'
import  { EnhancedTableToolbar } from '../Toolbar/index.jsx'
import { addAlert, updateAlert } from '../../store/alert/alert.action'
import "./index.scss";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:3000";
const AUDIO_ALERT_URL = 'https://assets.coderrocketfuel.com/pomodoro-times-up.mp3';

const columns = [
    { field: 'col1', headerName: 'SYMBOL', width: 150, headerClassName: 'header-class' },
    { field: 'col2', headerName: 'BID', width: 150, headerClassName: 'header-class' },
    { field: 'col3', headerName: 'BID SIZE', width: 150, headerClassName: 'header-class' },
    { field: 'col4', headerName: 'ASK', width: 150, headerClassName: 'header-class' },
    { field: 'col5', headerName: 'ASK_SIZE', width: 150, headerClassName: 'header-class' },
    { field: 'col6', headerName: 'DAILY CHANGE', width: 150, headerClassName: 'header-class',
        cellClassName: (params) => `${params.value < 0 ? 'negative' : 'positive'}`
    },
    { field: 'col7', headerName: 'DAILY CHANGE RELATIVE', width: 150,headerClassName: 'header-class',
        cellClassName: (params) => `${params.value < 0 ? 'negative' : 'positive'}`
    },
    { field: 'col8', headerName: 'LAST PRICE', width: 150, headerClassName: 'header-class' },
    { field: 'col9', headerName: 'VOLUME', width: 150, headerClassName: 'header-class' },
    { field: 'col10', headerName: 'HIGH', width: 150, headerClassName: 'header-class' },
    { field: 'col11', headerName: 'LOW', width: 150, headerClassName: 'header-class' },
    ];

export class _MarketTable extends React.Component{
    state = {
        allSymbols: [],
        realTimeData: [],
        missingSymbols: [],
        showDetailsModal: false,
        currSymbol: '',
        messageAlertModal: false,
        transferAlertModal: false,
        selectedRowData: [],
        rows: [],
        isLoading: false
    }

    async fetchData() {
        this.setState({ isLoading: true });
        const allSymbols = await getAllSymbols();
        const currentTableData = await getData();
        const missingSymbols = allSymbols.filter(x => !currentTableData.find(row => row[0] === x));

        this.setState({ 
            allSymbols,
            realTimeData: currentTableData,
            missingSymbols,
            isLoading: false
        })

        const socket = io(SOCKET_URL);
        socket.emit("getLiveData", allSymbols)
        socket.on("live data", (msg) => {
            const idx = this.state.realTimeData.findIndex(symbol => symbol[0] === msg[0])
            if(idx === -1 ) return;
            const newData = this.state.realTimeData
            newData[idx] = msg
            const currentAlert = this.props.alerts[msg[0]]
            if (currentAlert){
                this.handlePriceAlerts(msg, currentAlert)
            }
            this.setState({
                realTimeData: newData
            });
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    handlePriceAlerts = (msg, alert) => {
        const {topRange, topPercent, bottomRange, bottomPercent, alertType} = alert
        let shouldActivateAlert  = false
        const lastPrice = msg[7]
        const newAlert = { ...alert };
        if(topRange && (lastPrice > topRange)){
            shouldActivateAlert = true
            newAlert.topRange =''
        }

        if (bottomRange && (lastPrice < bottomRange)){
            shouldActivateAlert = true
            newAlert.bottomRange =''
        }
        
        if (topPercent &&  (lastPrice > lastPrice * (1+topPercent))){
            shouldActivateAlert = true
            newAlert.topPercent =''
        }
        
        if(bottomPercent && (lastPrice < lastPrice * (bottomPercent))) {
            shouldActivateAlert = true
            newAlert.bottomPercent =''
        }
        
        if (shouldActivateAlert){
            this.setState({
                currSymbol: msg
            });
            this.activateAlert(alertType)
            this.props.updateAlert(msg[0], newAlert)
        }
    }

    activateAlert = (alertType) => {
        if(alertType === 'voice'){
            var audio = new Audio(AUDIO_ALERT_URL)
            audio.play()
        }
        if(alertType === 'message') {
            this.setState({
                messageAlertModal: true
            });
        }
        if(alertType === 'transfer') {
            this.setState({
                transferAlertModal: true
            });
        }
    }

    closeMessageModal = () =>{
        this.setState({
            messageAlertModal: false
        });
    }

    onRemoveSymbol = () => {
        const symbolsToRemove = this.state.selectedRowData.map(d => d.col1)
        removeSymbol(symbolsToRemove);
        const newSymbols = this.state.realTimeData.filter(row => !symbolsToRemove.includes(row[0])); 
        const missingSymbols = this.state.allSymbols.filter(x => !newSymbols.find(row => row[0] === x));
        this.setState({
            realTimeData: newSymbols,
            selectedRowData: [],
            selectionModel: [],
            missingSymbols
        });
    }

    onToggleDetailsModal = (row) => {
        let currSymbol = ""
        if (row) {
            currSymbol = Object.values(row)
            currSymbol.shift()
        }

        this.setState({
            ...this.state,
            showDetailsModal: !this.state.showDetailsModal,
            currSymbol
        })
    }

    getTableData = () => {
        return this.state.realTimeData.map((row, idx) => {
            let newRow = { id: idx + 1};
            row.forEach((val, valIdx) => newRow[`col${valIdx + 1}`] = val)
            return newRow;
        });
    }

    render(){
        const tableData = this.getTableData();
        const { 
            missingSymbols,
            currSymbol,
            showDetailsModal,
            messageAlertModal,
            selectedRowData,
            isLoading
        } = this.state;

        return(
            <section>
                <EnhancedTableToolbar 
                    numSelected={selectedRowData.length}
                    onRemove={this.onRemoveSymbol}
                    missingSymbols={missingSymbols}
                    onAdd={this.fetchData}
                    isLoading={isLoading}/>
                <div style={{ width: '100%' }}>
                     <div style={{ height: '80vh'}}>
                        <DataGrid checkboxSelection
                            selectionModel={this.state.selectionModel}
                            onSelectionModelChange={(ids) => {
                                const selectedIDs = new Set(ids);
                                const selectedRowData = tableData.filter((row) =>
                                  selectedIDs.has(row.id)
                                );
                                this.setState({
                                    ...this.state,
                                    selectedRowData,
                                    selectionModel: ids
                                })
                            }}
                            disableSelectionOnClick
                            rows={tableData}
                            columns={columns}
                            onRowClick={(params, event) => {
                                event.defaultMuiPrevented = true;
                                this.onToggleDetailsModal(params.row)
                            }}
                        />
                    </div>
                </div>
                {showDetailsModal && <DetailsModal symbol={currSymbol} closeModal={this.onToggleDetailsModal}/>}
                {messageAlertModal && <MessageModal symbol={currSymbol} closeModal={this.closeMessageModal}/>}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        alerts: state.alertModule.alertPreferences
    }
}

const mapDispatchToProps = {
    addAlert,
    updateAlert
}

export const MarketTable = connect(mapStateToProps, mapDispatchToProps)(_MarketTable);
