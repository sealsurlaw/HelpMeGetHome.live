// import Axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: null,
            left: null,
            right: null,
            forward: null,
            backward: null,
        }

        // this.timerHandle = this.timerHandle.bind(this);
    }

    componentDidMount() {
        fetch('/update')
            .then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({
                    time: res.data.time,
                    left: res.data.left,
                    right: res.data.right,
                    forward: res.data.forward,
                    backward: res.data.backward,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    // timerHandler() {
    //     console.log("Time up");
    // }

    render() {
        return (
            <div>
                <Timer time={this.state.time} />
                <Stream />
                <Controls />
                <Chat />
            </div>
        );
    }
}

class Timer extends React.Component {
    render() {
        return (
            <div id="timer">
                {this.props.time}
            </div>
        );
    }
}

class Stream extends React.Component {
    render() {
        return (
            <video width="320" height="240">
                <source src="/videos/movie.mp4" type="video/mp4" />
                {/* <source src="movie.ogg" type="video/ogg" /> */}
                Your browser does not support the video tag.
            </video>
        );
    }
}

class Controls extends React.Component {
    render() {
        return (
            <div id="controls">
                These are the controls
            </div>
        );
    }
}

class Chat extends React.Component {
    render() {
        return (
            <div id="chat">
                This is the chat
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));