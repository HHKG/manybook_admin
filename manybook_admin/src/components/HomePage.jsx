import React,{Component, Suspense} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from '../route';

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <div>
                <Router>
                    <Suspense fallback="">
                        <Switch>
                            {
                                routes.map((item,key)=>{
                                    return <Route path={item.path} component={item.component} exact={item.exact?item.exact:false} key={key}></Route>
                                })
                            } 
                        </Switch>
                    </Suspense>
                </Router>
            </div>
        )
    }
}

export default HomePage;