import React,{Component} from 'react';
import HomePage from './HomePage';

class App extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(<div><HomePage></HomePage></div>);
    }
}

export default App;