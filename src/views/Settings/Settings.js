import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchProperties } from '../../actions';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'
import themes from './data/Themes'


class Settings extends Component {

    constructor(props){
        super(props)
        this.state={
            org: '',
            temi: themes,
            isOpen: false,
            theme: 1,
            title: '',
            desc: '',
            logo: '',
            twitter: '',
            medium: '',
            news:'',
            forum: '',
            footer_logoA: '',
            footer_logoB: '',
            footerName: '',
            privacy: '',
            legal: '',
            isChanged: false
        }

        this.onClick = this.onClick.bind(this)
        this.onThemeSelect = this.onThemeSelect.bind(this)
        this.load = this.load.bind(this)
        this.save = this.save.bind(this)
    }

    async settings(org) {
        var url = "http://service:9000/dati-gov/v1/settings?organization=" + org
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        return response.json();
    }

    load(org){
        let response = this.settings(org)
        response.then((json)=> {
            this.setState({
                theme: json.theme,
                title: json.headerSiglaTool,
                desc: json.headerDescTool,
                logo: json.headerLogo,
                twitter: json.twitterURL,
                medium: json.mediumURL,
                news: json.notizieURL,
                forum: json.forumURL,
                footer_logoA: json.footerLogoAGID,
                footer_logoB: json.footerLogoGov,
                footerName: json.footerNomeEnte,
                privacy: json.footerPrivacy,
                legal: json.footerLegal,
            });
        });
    }

   /**
  * Save Settings
  */
  saveSettings = (settings) => {
    console.log('save settings: ' + settings)
    //save data
    let json = {
        theme: this.state.theme,
        headerSiglaTool: this.state.title,
        headerDescTool: this.state.desc,
        headerLogo: this.state.logo,
        twitterURL: this.state.twitter,
        mediumURL: this.state.medium,
        notizieURL: this.state.news,
        forumURL: this.state.forum,
        footerLogoAGID: this.state.footer_logoA,
        footerLogoGov: this.state.footer_logoB,
        footerNomeEnte: this.state.footerName,
        footerPrivacy: this.state.privacy,
        footerLegal: this.state.legal
    }

    const response = this.save(json, this.state.org);
    this.setState({saving: true});
    response.then((data)=> {
      this.setState({
        saving: false
      })
    })
  }

  async save(settings, org) {
        const response = await fetch( 'http://service:9000/dati-gov/v1/settings?organization=' + org, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings)
        })
        return response.json();
    }

    onClick() {
        this.setState({
            isOpen: true,
        });
    };

    hideModal = (e) => {
        e.preventDefault();
        this.setState({
            isOpen: false
        });
    };

    onThemeSelect(id){
        this.setState({
            theme: id,
            isOpen: false,
            isChanged: true
        })
        let settings = this.state;
        settings.theme = id;
        this.saveSettings(settings);
    }

    onTitleChange(value){
        this.setState({
            title: value,
            isChanged: true
        });
        let settings = this.state;
        settings.title = value;
        this.saveSettings(settings);
    }

    onDescChange(value) {
        this.setState({
            desc: value,
            isChanged: true
        });
        let settings = this.state;
        settings.desc = value;
        this.saveSettings(settings);
    }

    onLogoChange(value) {
        this.setState({
            logo: value,
            isChanged: true
        });
        let settings = this.state;
        settings.logo = value;
        this.saveSettings(settings);
    }

    onTwitterChange(value) {
        this.setState({
            twitter: value,
            isChanged: true
        });
        let settings = this.state;
        settings.twitter = value;
        this.saveSettings(settings);
    }

    onMediumChange(value) {
        this.setState({
            medium: value,
            isChanged: true
        });
        let settings = this.state;
        settings.medium = value;
        this.saveSettings(settings);
    }
    
    onFootAChange(value) {
        this.setState({
            footer_logoA: value,
            isChanged: true
        });
        let settings = this.state;
        settings.footer_logoA = value;
        this.saveSettings(settings);
    }

    onFootBChange(value) {
        this.setState({
            footer_logoB: value,
            isChanged: true
        });
        let settings = this.state;
        settings.footer_logoB = value;
        this.saveSettings(settings);
    }

    onFootnameChange(value) {
        this.setState({
            footerName: value,
            isChanged: true
        });
        let settings = this.state;
        settings.footerName = value;
        this.saveSettings(settings);
    }

    onPrivacyChange(value) {
        this.setState({
            privacy: value,
            isChanged: true
        });
        let settings = this.state;
        settings.privacy = value;
        this.saveSettings(settings);
    }

    onLegalChange(value) {
        this.setState({
            legal: value,
            isChanged: true
        });
        let settings = this.state;
        settings.legal = value;
        this.saveSettings(settings);
    }

    onNewsChange(value) {
        this.setState({
            news: value,
            isChanged: true
        });
        let settings = this.state;
        settings.news = value;
        this.saveSettings(settings);
    }

    onForumChange(value) {
        this.setState({
            forum: value,
            isChanged: true
        });
        let settings = this.state;
        settings.forum = value;
        this.saveSettings(settings);
    }

    onOrgChange(value){
        this.setState({
            org: value,
        })

        this.load(value)
    }

    render() {
    const { loggedUser} = this.props
    return (
        <div>
            <Modal
                contentLabel="Seleziona un tema"
                className="Modal__Bootstrap modal-dialog modal-80"
                isOpen={this.state.isOpen}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.hideModal.bind(this)}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Chiudi</span>
                        </button>
                        <h4 className="modal-title">Modifica il tema</h4>
                    </div>
                    <div className="modal-body">
                        <h5>Scegli il tema da usare</h5>
                        <div className="row ml-0 preview-widget-container">
                            {
                                this.state.temi.map((theme, key) => {
                                    return (
                                        <div key={key} className="list-group">
                                            <div  className="col-sm-12 col-md-12 col-lg-12 mb-20">
                                                <a className="list-group-item" onClick={() => this.onThemeSelect(theme.id)}>
                                                    <h6 className="list-group-item-heading">
                                                        {'Tema ' + theme.id}
                                                    </h6>
                                                    <img className="col-sm-12 col-md-12 col-lg-12 mb-20" src={"/img/themes/" + theme.snapshot} />
                                                </a>
                                            </div>
                                            
                                            
                                        </div>
                                    )}
                                )
                            }

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.hideModal.bind(this)}>Chiudi</button>
                    </div>
                </div>
            </Modal>
            <div className="form-group row">
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-block">
                            <div className="col-4 form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Organizzazione</label>
                                <select className="form-control" id="ordinamento" aria-required="true" onChange={(e)=> this.onOrgChange(e.target.value)} value={this.state.org}>
                                    <option value=""></option>
                                    <option value="daf">Daf</option>
                                    <option value="roma">Comune di Roma</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Tema</label>
                                <div className="col-10">
                                    <div className="form-inline">
                                        <input className="form-control" type="text" value={'Tema ' + this.state.theme} id="example-search-input" onClick={this.onClick}/>
                                        <button type="button" className="btn btn-primary" onClick={this.onClick}><i className="fa fa-edit"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Titolo</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.title} 
                                        id="example-search-input" onChange= {(e) => this.onTitleChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Descrizione</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.desc} 
                                        id="example-search-input" onChange={(e) => this.onDescChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Logo</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.logo} 
                                        id="example-search-input" onChange={(e) => this.onLogoChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                    <label htmlFor="example-text-input" className="col-2 col-form-label"><i className="fa fa-twitter"></i>{" "}Twitter</label>
                                <div className="col-10">
                                    <input className="form-control" type="text" value={this.state.twitter} 
                                        id="example-text-input" onChange={(e) => this.onTwitterChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                    <label htmlFor="example-search-input" className="col-2 col-form-label"><i className="fa fa-medium"></i>{" "}Medium</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.medium} 
                                        id="example-search-input" onChange={(e) => this.onMediumChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-text-input" className="col-2 col-form-label"><i className="fa fa-twitter"></i>{" "}Notizie</label>
                                <div className="col-10">
                                    <input className="form-control" type="text" value={this.state.news}
                                        id="example-text-input" onChange={(e) => this.onTwitterChange(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label"><i className="fa fa-medium"></i>{" "}Forum</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.forum}
                                        id="example-search-input" onChange={(e) => this.onMediumChange(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Footer Logo 1</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.footer_logoA} 
                                        id="example-search-input" onChange={(e) => this.onFootAChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Footer Logo 2</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.footer_logoB} 
                                        id="example-search-input" onChange={(e) => this.onFootBChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Footer Nome</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.footerName} 
                                        id="example-search-input" onChange={(e) => this.onFootnameChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Privacy Policy</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.privacy} 
                                        id="example-search-input" onChange={(e) => this.onPrivacyChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Note Legali</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.legal} 
                                        id="example-search-input" onChange={(e) => this.onLegalChange(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

Settings.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { }
    const properties = state.propertiesReducer ? state.propertiesReducer['prop'] || {} : {} 
    return { loggedUser, properties }
}

export default connect(mapStateToProps)(Settings)
