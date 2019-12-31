import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import { stat } from 'fs';

class Table extends Component {
    constructor(props){
      super(props);
    this.state = ({properti: this.props.properti})
    this.deleteSiswa = this.deleteSiswa.bind(this);
    // this.editSiswa = this.editSiswa.bind(this);
    this.state = {properti:[
      {nama: "Alfansyah",alamat: "Jalan Pahlawan",hobi: "Makar",disabled: true,editOn: 'none',toggleEditData: {action:1,button: 'btn-info',text: 'Edit'}}],
      nama: "",
      alamat: "",
      hobi: "",
      isShow: 'none',
      toggleTambahData:{action: 1,button: 'btn-success',text: 'Tambah Data'},
      toggleEditData: {action:1,button: 'btn-info',text: 'Edit'},
      };


      this.cekSubmit = this.cekSubmit.bind(this);
      this.changeNama = this.changeNama.bind(this);
      this.changeAlamat = this.changeAlamat.bind(this);
      this.changeHobi = this.changeHobi.bind(this);
      this.showTambahData = this.showTambahData.bind(this);
      // this.saveEditSiswa = this.saveEditSiswa.bind(this);
    }

    componentDidMount(){
      
    }

    render(){
      return(
      <div className="container col-md-12">
        <h3 style={{textAlign: "center"}} >CRUD State React JS Tabel Siswa</h3>
        <table className="tbl-siswa table table-hovered table-striped table-bordered">
          <thead>
            <tr>
              <th>No</th><th>Nama</th><th>Alamat</th><th>Hobi</th><th style={{textAlign: "center"}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.properti.map((val,index) => {
              return(
              <tr key={index}>
                <td style={{textAlign:"center",width: '5%'}}>{index+1}</td>
                  <td style={{width: '20%'}}><input type="text" onChange={this.changeNama} disabled={val.disabled} defaultValue={val.nama} style={{width: '100%'}}></input></td>
                  <td style={{width: '30%'}}><input onChange={this.changeAlamat} disabled={val.disabled} defaultValue={val.alamat} style={{width: '100%'}}></input></td>
                  <td style={{width: '20%'}}><input onChange={this.changeAlamat} disabled={val.disabled} defaultValue={val.hobi} style={{width: '100%'}}></input></td>
                  <td style={{width: 20+'%',whiteSpace:"nowrap"}}>                
                  <center>
                  <button onClick={this.saveEditSiswa.bind(this,index)} className={"btn btn-save btn-success"} style={{marginRight: 10+'px',display: val.editOn}}>Save</button> 
                  <button onClick={this.editSiswa.bind(this,index)} className={'btn btn-edit ' + val.toggleEditData.button} style={{marginRight: 10+'px'}}>{val.toggleEditData.text}</button>
                  <button onClick={this.deleteSiswa} className="btn btn-danger btn-hapus">Delete</button>
                  </center>
                  </td>                  
              </tr>
            )})}
          </tbody>
        </table>
        <div style={{float: 'right'}}>
          <button onClick={this.showTambahData} style={{margin: '15px'}} className={'btn ' + this.state.toggleTambahData.button}>{this.state.toggleTambahData.text}</button>       
        </div>
        <div className="col-md-12" id={"formTambah"} style={{display: this.state.isShow}} >
          <div style={{display: this.state.isShow}}>
            <h3 style={{textAlign: "center"}}>Tambah Data</h3>
            <form onSubmit={this.cekSubmit}>
            <div className="form-group col-md-3">
              <label htmlFor="nama">Nama</label>
              <input onChange={this.changeNama} value={this.state.nama} id="nama" name="nama" type="text" className="form-control" />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="alamat">Alamat</label>
              <input onChange={this.changeAlamat} id="alamat" name="alamat" type="text" className="form-control" defaultValue={this.state.alamat} />
            </div>

            <div className="form-group col-md-3">
              <label htmlFor="hobi">Hobi</label>
              <input onChange={this.changeHobi} id="hobi" name="hobi" type="text" className="form-control" defaultValue={this.state.hobi} />
            </div>

            <div className="form-group col-md-3">
              <label>&nbsp;</label>
            <button className="btn form-control btn-success" type="submit">Tambah</button>
            </div>
            
          </form>     
        </div>
      </div>
      </div>
      );
    }

    changeNama(e){
      this.setState({nama: e.target.value});
    }
  
    changeAlamat(e){
      this.setState({alamat: e.target.value});
    }
  
    changeHobi(e){
      this.setState({hobi: e.target.value});
    }
  
    cekSubmit(e){
      e.preventDefault();
      let arrNama = [];
      if(!this.state.nama){
        return alert('Masukkan Nama!')
      }
      if(!/^[a-zA-Z ]*$/.test(this.state.nama) ||this.state.nama.trim().length == 0 ){
        return alert('Nama tidak valid!')
      }
  
      const copyArray = this.state.properti.slice();
      for(var i = 0;i < copyArray.length;i++){
        arrNama.push(copyArray[i].nama);
      }
      if(arrNama.includes(this.state.nama)){
        alert('Nama tidak boleh sama!')
      }else{
        copyArray.push({nama: this.state.nama,alamat: this.state.alamat,hobi: this.state.hobi,disabled:true,editOn: 'none',toggleEditData: {action:1,button: 'btn-info',text: 'Edit'}});
      }
      
      const tmbhData = this.state.toggleTambahData;
      
      this.setState({properti: copyArray,nama: '',alamat:'',hobi: '',isShow: 'none',toggleTambahData:{action: 1,button:'btn-success',text:'Tambah Data'} })
    }
  
    showTambahData(e){
      let toggle = this.state.toggleTambahData
      if(toggle.action === 1){
        this.setState({isShow: '',toggleTambahData: {action: 2,button:'btn-warning',text:'Batal'}})
      }else{
        this.setState({isShow: 'none',toggleTambahData: {action: 1,button:'btn-success',text:'Tambah Data'}})
      }
      // console.log(this.state.toggleTambahData)
    }

    deleteSiswa(e){
      var value = this.state.properti.indexOf(e);
      this.state.properti.splice(value,1);
      this.setState({properti: this.state.properti});   
      
    }

    editSiswa(index,e){
     let editRow = this.state.properti.map((val,order) => {
        if(index == order){
          if(val.disabled && val.editOn=='none' && val.toggleEditData.action == 1){
          return Object.assign({},val,{
            disabled: false,
            editOn: '',
            toggleEditData: {action:2, button: 'btn-warning', text: 'Batal'}
          });
        }else{
          return Object.assign({},val,{
            disabled: true,
            editOn: 'none',
            toggleEditData: {action:1, button: 'btn-info', text: 'Edit'}
          });
        }
        }
        return val;
      });
      this.setState({properti: editRow})
    }
    
    saveEditSiswa(index){
      // if(!this.state.nama){
      //   return alert('Masukkan Nama')
      // }else if(!/^[a-zA-Z ]*$/.test(this.state.nama) ||this.state.nama.trim().length == 0){
      //   return alert('Nama Tidak Valid!')
      // }
      let updateSiswa = this.state.properti.map((val,order) => {
        if(index == order){
          if(!this.state.nama){
            return Object.assign({},val,{
              nama: val.nama,
              alamat: val.alamat,
              hobi: val.hobi,
              disabled: true,
              editOn: 'none',
              toggleEditData: {action:1, button: 'btn-info', text: 'Edit'}
            });
          }
          else{
            return Object.assign({},val,{
              nama: this.state.nama,
              alamat: this.state.alamat,
              hobi: this.state.hobi,
              disabled: true,
              editOn: 'none',
              toggleEditData: {action:1, button: 'btn-info', text: 'Edit'}
            });
          }
            
        }
        return val;
      })
      console.log(updateSiswa)
      this.setState({properti: updateSiswa,nama:'',alamat:'',hobi:''})
      
    }
}


class InputData extends Component {
  constructor(props){
    super(props);
    this.state = {properti:[
      {nama: "Alfansyah",alamat: "Jalan Pahlawan",hobi: "Makar",disabled: true}],
      nama: "",
      alamat: "",
      hobi: "",
      isShow: 'none',
      toggleTambahData:{action: 1,button: 'btn-success',text: 'Tambah Data'}};  
    this.cekSubmit = this.cekSubmit.bind(this);
    this.changeNama = this.changeNama.bind(this);
    this.changeAlamat = this.changeAlamat.bind(this);
    this.changeHobi = this.changeHobi.bind(this);
    this.showTambahData = this.showTambahData.bind(this)
  }

  componentDidMount(){
    
  }

  render(){
    return(
      <div className="col-md-12" id={"formTambah"}  >
        <div style={{float: 'right'}}>
          <button onClick={this.showTambahData} style={{margin: '15px'}} className={'btn ' + this.state.toggleTambahData.button}>{this.state.toggleTambahData.text}</button>       
        </div>       
        <Table properti={this.state.properti} />
          <div style={{marginTop:'250px',display: this.state.isShow}}>
            <h3 style={{textAlign: "center",marginTop:'150px'}}>Tambah Data</h3>
            <form onSubmit={this.cekSubmit}>
            <div className="form-group col-md-3">
              <label htmlFor="nama">Nama</label>
              <input onChange={this.changeNama} value={this.state.nama} id="nama" name="nama" type="text" className="form-control" />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="alamat">Alamat</label>
              <input onChange={this.changeAlamat} id="alamat" name="alamat" type="text" className="form-control" defaultValue={this.state.alamat} />
            </div>

            <div className="form-group col-md-3">
              <label htmlFor="hobi">Hobi</label>
              <input onChange={this.changeHobi} id="hobi" name="hobi" type="text" className="form-control" defaultValue={this.state.hobi} />
            </div>

            <div className="form-group col-md-3">
              <label>&nbsp;</label>
            <button className="btn form-control btn-success" type="submit">Tambah</button>
            </div>
            
          </form>     
        </div>
      </div>
    );
  }

  changeNama(e){
    this.setState({nama: e.target.value});
  }

  changeAlamat(e){
    this.setState({alamat: e.target.value});
  }

  changeHobi(e){
    this.setState({hobi: e.target.value});
  }

  cekSubmit(e){
    e.preventDefault();
    let arrNama = [];
    if(!this.state.nama){
      return alert('Masukkan Nama!')
    }
    if(!/^[a-zA-Z ]*$/.test(this.state.nama) ||this.state.nama.trim().length == 0 ){
      return alert('Nama tidak valid!')
    }

    const copyArray = this.state.properti.slice();
    for(var i = 0;i < copyArray.length;i++){
      arrNama.push(copyArray[i].nama);
    }
    if(arrNama.includes(this.state.nama)){
      alert('Nama tidak boleh sama!')
    }else{
      copyArray.push({nama: this.state.nama,alamat: this.state.alamat,hobi: this.state.hobi,disabled:true});
    }    
    this.setState({properti: copyArray,nama: '' })
  }

  showTambahData(e){
    let toggle = this.state.toggleTambahData
    if(toggle.action === 1){
      this.setState({isShow: '',toggleTambahData: {action: 2,button:'btn-warning',text:'Batal'}})
    }else{
      this.setState({isShow: 'none',toggleTambahData: {action: 1,button:'btn-success',text:'Tambah Data'}})
    }
    // console.log(this.state.toggleTambahData)
  }

  

}

export default Table;