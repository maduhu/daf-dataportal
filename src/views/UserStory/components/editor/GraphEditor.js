import React, { Component } from 'react';
import Components from 'react';
import ChangeGraphDialog from '../ChangeGraphDialog';
import IframeWidget from '../../../DashboardManager/components/widgets/IframeWidget';
import App from '../InfinityScrollWidgets/App.js'

// Services
import WidgetService from '../../../DashboardManager/components/services/WidgetService';

const widgetService = new WidgetService();

class GraphEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: props.graph,
      widgets : {},
      isModalAddOpen: false
    };

    if (!this.state.graph) {
      this.state.graph = {
        "title": "",
         "props": {
            "url": null,
            "identifier": null,
            "origin": null
        }
      }
    }

    //bind functions
    this.changeGraph = this.changeGraph.bind(this);

    //get iframe from server
    let iframeTypes = widgetService.getIframe();
    iframeTypes.then(iframes => {
      this.loadIframe(iframes);
    })

  }
  
  /**
   * Load all Iframe types
   */
  loadIframe = (iframes) => {
  //  let widgetsAppo = {};
    iframes.map(iframe => {
        this.widgetsTypes[iframe.identifier] = {
        "type": IframeWidget,
        "title": iframe.title,
        "props":{
          "url": iframe.iframe_url,
          "identifier": iframe.identifier,
          "origin": iframe.origin
        }
      }
    }) 
//    this.setState({widgets: widgetsAppo})
  }

  /**
   * Types of widgets avaible
   */
  widgetsTypes = {}

  /**
   * Open modal Change Graph
   */
  openModalChangeGraph() {
    this.setState({
        isModalOpen: true
    });
  }

  /**
   * Set Change Graph
   */
  changeGraph(widgetName) {
    this.onRequestClose();
    this.state.graph = this.widgetsTypes[widgetName];
    this.props.onChange(this.props.keyValue, this.state.graph)
  }

  onRequestClose = () => {
    this.setState({
        isModalOpen: false,
    });
  }


  /**
   * Render Function
   */
  render() {
    
    const iframeStyle = {
      width: '100%',
      height: '500px',
      border: '0'
    }

    return (
      <div>
        {
          //if graph selected
          this.state.graph.props.url &&
          <div>
            <iframe
              className={this.props.class}
              ref="iframe"
              frameBorder={'0'}
              style={iframeStyle}
              src={this.state.graph.props.url}
            />
            
            {
              this.props.readonly!=true &&
              <div className="text-center mt-20">
                <button type="button" className="btn btn-default" onClick={() => this.openModalChangeGraph()}>
                    Cambia grafico
                </button>
              </div>
            }
          </div>
        }
        {
          //if graph not selected
          !this.state.graph.props.url && this.props.readonly!=true &&
          <div className="text-center mt-20 mb-40">
            <button type="button" className="btn btn-default" onClick={() => this.openModalChangeGraph()}>
                Seleziona grafico
            </button>
          </div>
        }
        <div style={{zIndex: '5'}}>
        <App 
          widgets={this.widgetsTypes}
          isModalOpen={this.state.isModalOpen}
          onWidgetSelect={this.changeGraph}
          onRequestClose={this.onRequestClose}
        />
        </div>
        {/*<ChangeGraphDialog
            widgets={this.state.widgets}
            isModalOpen={this.state.isModalOpen}
            onWidgetSelect={this.changeGraph}
            onRequestClose={this.onRequestClose}
            >
        </ChangeGraphDialog>*/}

      </div>
    )
  }

}

export default GraphEditor;
