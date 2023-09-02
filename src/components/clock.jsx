import React, { Component } from 'react'

class Clock extends Component {
    state = { 
        time:new Date(),
    } 
    
    clock(){
        this.setState({time:new Date()});
    }

    render() { 
        setInterval(()=>{this.clock()},1000)
        
        return (
            <>
            <span>{this.state.time.toLocaleString()}</span>
            </>
        );
    }
}
 
export default Clock;