import React, { Component,Suspense} from 'react';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import router from '../routes/index';
import { Spin } from 'antd';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: '路由入口文件'
        }
    }
    render() {
        return (
            <Router>
                <div className="app">
                <Router>
                    <Suspense fallback={<Spin></Spin>}>
                        <Switch>
                            {
                                router.map((item,key)=>{
                                    return <Route path={item.path} key={key} component={item.component} exact={item.exact?item.exact:false}></Route>;
                                })
                            }
                        </Switch>
                    </Suspense>
                </Router>
                </div>
            </Router>
        );
    }
}

export default App;