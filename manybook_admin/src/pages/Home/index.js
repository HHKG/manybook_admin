import React,{Component} from 'react';
import AddCarousel from '../AddCarousel';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(<div className="globalCss">Home
        <AddCarousel></AddCarousel>
        </div>);
    }
}

export default Home;