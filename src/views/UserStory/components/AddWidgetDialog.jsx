import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';

const AddWidgetDialog = ({ widgets, isModalOpen, onRequestClose, onWidgetSelect}) => {
  const widgetItems = Object.keys(widgets).map((widget, key) => {
    let wid = widgets[widget].type;
 
    if(widget && widget.indexOf("BtnControlWidget") != 0)
      return (
        <div key={key} className="list-group">
          <a href="#/dash" className="list-group-item" onClick={() => onWidgetSelect(widget)}>
            <h6 className="list-group-item-heading">
              <div className="preview-widget">
                {React.createElement(wid)}
              </div>
              {widgets[widget].title}
            </h6>
          </a>
        </div>
      );
  });

  return (
    <Modal
      contentLabel="Add a widget"
      className="Modal__Bootstrap modal-dialog"
      isOpen={isModalOpen}>
      <div className="modal-content">
       <div className="modal-header">
         <button type="button" className="close" onClick={onRequestClose}>
           <span aria-hidden="true">&times;</span>
           <span className="sr-only">Close</span>
         </button>
         <h4 className="modal-title">Add a widget</h4>
       </div>
       <div className="modal-body">
         <h5>Pick a widget to add</h5>
         {widgetItems}
       </div>
       <div className="modal-footer">
         <button type="button" className="btn btn-default" onClick={onRequestClose}>Close</button>
       </div>
      </div>
    </Modal>
  );
};

AddWidgetDialog.propTypes = {
  widgets: PropTypes.object,
  isModalOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onWidgetSelect: PropTypes.func,
};

export default AddWidgetDialog;
