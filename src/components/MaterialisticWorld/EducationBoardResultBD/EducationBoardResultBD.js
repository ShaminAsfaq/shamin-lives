import React, {createRef} from 'react';
import TextField from '@material-ui/core/TextField';

import './EducationBoardResultBD.css';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import axios from 'axios';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

class EducationBoardResultBD extends React.Component {
    // const chosenBoardRef = useRef();

    constructor(props) {
        super(props);
        this.state = {};
    }

    reverseString = (str) => {
        // Check input
        if (!str || str.length < 2 ||
            typeof str !== 'string') {
            return 'Not valid';
        }

        // Take empty array revArray
        const revArray = [];
        const length = str.length - 1;

        // Looping from the end
        for (let i = length; i >= 0; i--) {
            revArray.push(str[i]);
        }

        // Joining the array elements
        return revArray.join('');
    };

    componentDidMount() {

        // However to make it work, we are going to use the cors-anywhere free service to bypass this
        let PROXY = 'https://cors-anywhere.herokuapp.com/';
        let URL = 'http://www.educationboardresults.gov.bd';

        // Execute request
        var oReq = new XMLHttpRequest();

        oReq.addEventListener("load", (data) => {
            data = data.target.response;
            // console.log(data)
            let approximateIndexOfCaptcha = data.indexOf("+")
            let subString = data.substr(approximateIndexOfCaptcha - 5, 10);
            subString = subString.split("+");

            let firstHalf = subString[0].indexOf(">");
            firstHalf = subString[0].substr(firstHalf + 1);

            let lastHalf = this.reverseString(subString[1]);
            let indexOfPointBreak = lastHalf.indexOf("<");
            lastHalf = lastHalf.substr(indexOfPointBreak + 1);

            this.setState({
                firstNumber: firstHalf.trim(),
                secondNumber: lastHalf.trim(),
                roll: 0,
                reg: 0,
                captcha: 0,
                proxyRequest: oReq
            })

        });
        // Or post, etc
        oReq.open("GET", PROXY + URL);
        oReq.send();
    }

    searchResult = () => {
        // console.log({...this.state});
        // console.log(Number(this.state.roll));
        // console.log(Number(this.state.reg));
        // console.log(Number(this.state.captcha));
        // console.log(Number(this.state.selectedYear));

        if (
            Number(this.state.roll) >= 0 &&
            Number(this.state.reg) >= 0 &&
            Number(this.state.captcha) >= 0 &&
            this.state.selectedExam &&
            Number(this.state.selectedYear) &&
            this.state.selectedBoard
        ) {
            this.setState({
                error: false
            }, () => {

                let PROXY = 'https://cors-anywhere.herokuapp.com/';
                let URL = 'http://www.educationboardresults.gov.bd?';
                //
                let FINAL = `sr=3&et=2&exam=${this.state.selectedExam}&year=${this.state.selectedYear}&board=${this.state.selectedBoard}&roll=${this.state.roll}&reg=${this.state.reg}&value_s=${this.state.captcha}&button2=Submit`;
                //
                axios.post(PROXY + URL + FINAL, {
                    sr: 3,
                    et: 2,
                    exam: this.state.selectedExam,
                    year: this.state.selectedYear,
                    board: this.state.selectedBoard,
                    roll: this.state.roll,
                    reg: this.state.reg,
                    value_s: this.state.captcha,
                    button2: 'Submit'
                }).then((data) => {
                    console.log(data);
                });

                // let oReq = this.state.proxyRequest;
                // oReq.addEventListener("load", (data) => {
                //     data = data.target.response;
                //     console.log(data);
                // });
                // oReq.open("POST", PROXY + URL + FINAL);
                // oReq.send();
            });
        } else {
            this.setState({
                error: true
            })
        }
    };

    listOfExams = () => {
        return [
            {
                value: '',
                plainString: 'None'
            },
            {
                value: 'ssc',
                plainString: 'SSC/Dakhil/Equivalent'
            },
            {
                value: 'jsc',
                plainString: 'JSC/JDC'
            },
            {
                value: 'ssc',
                plainString: 'SSC/Dakhil'
            },
            {
                value: 'ssc_voc',
                plainString: 'SSC(Vocational)'
            },
            {
                value: 'hsc',
                plainString: 'HSC/Alim'
            },
            {
                value: 'hsc_voc',
                plainString: 'HSC(Vocational)'
            },
            {
                value: 'hsc_hbm',
                plainString: 'HSC(BM)'
            },
            {
                value: 'hsc_dic',
                plainString: 'Diploma in Commerce'
            },
            {
                value: 'hsc',
                plainString: 'Diploma in Business Studies'
            },
        ];
    };

    listOfYears = () => {
        let list = [{
            value: '',
            plainString: 'None'
        }];

        let currentYear = new Date().getFullYear();
        for (let year = 2002; year <= currentYear; year++) {
            list.push({
                value: year,
                plainString: year
            });
        }
        return list;
    };

    listOfBoards = () => {
        return [
            {
                value: '',
                plainString: 'None'
            },
            {
                value: 'barisal',
                plainString: 'Barisal'
            },
            {
                value: 'chittagong',
                plainString: 'Chittagong'
            },
            {
                value: 'comilla',
                plainString: 'Comilla'
            },
            {
                value: 'dhaka',
                plainString: 'Dhaka'
            },
            {
                value: 'dinajpur',
                plainString: 'Dinajpur'
            },
            {
                value: 'jessore',
                plainString: 'Jessore'
            },
            {
                value: 'mymensingh',
                plainString: 'Mymensingh'
            },
            {
                value: 'rajshahi',
                plainString: 'Rajshahi'
            },
            {
                value: 'sylhet',
                plainString: 'Sylhet'
            },
            {
                value: 'madrasah',
                plainString: 'Madrasah'
            },
            {
                value: 'tec',
                plainString: 'Technical'
            },
            {
                value: 'dibs',
                plainString: 'DIBS(Dhaka)'
            }
        ];
    };

    render() {
        return (
            <div className='root'>
                {
                    this.state.firstNumber && this.state.secondNumber &&
                    <div className='education-board-form'>
                        <Alert severity="error" style={{marginBottom: '15px'}}>
                            Education Board doesn't have proper API. This can't be done, most probably.
                        </Alert>

                        <FormControl className="education-board-list" fullWidth>
                            <InputLabel htmlFor="grouped-select">Examination</InputLabel>
                            <Select
                                defaultValue="" id="grouped-select"
                                onChange={(e) => {
                                    this.setState({
                                        selectedExam: e.target.value
                                    })
                                }}
                            >
                                {
                                    this.listOfExams().map((board, idx) => {
                                        return (
                                            <MenuItem value={board.value} key={idx}>
                                                {board.plainString}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>

                        <FormControl className="education-board-list" fullWidth>
                            <InputLabel htmlFor="grouped-select">Year</InputLabel>
                            <Select

                                defaultValue="" id="grouped-select"
                                onChange={(e) => {
                                    this.setState({
                                        selectedYear: e.target.value
                                    })
                                }}
                            >
                                {
                                    this.listOfYears().map((year, idx) => {
                                        return (
                                            <MenuItem value={year.value} key={idx}>
                                                {year.plainString}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>

                        <FormControl className="education-board-list" fullWidth>
                            <InputLabel htmlFor="grouped-select">Board</InputLabel>
                            <Select
                                defaultValue="" id="grouped-select"
                                onChange={(e) => {
                                    this.setState({
                                        selectedBoard: e.target.value
                                    })
                                }}
                            >
                                {
                                    this.listOfBoards().map((board, idx) => {
                                        return (
                                            <MenuItem value={board.value} key={idx}>
                                                {board.plainString}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>

                        <TextField
                            onChange={(e) => {
                                this.setState({
                                    roll: e.target.value
                                })
                            }}
                            error={Math.abs(this.state.roll) >= 0 ? false : true}
                            autoComplete='off'
                            id="margin-none"
                            placeholder='Roll Number'
                            fullWidth
                            className='text-field'
                            // helperText="You must provide your roll number"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />

                        <TextField
                            onChange={(e) => {
                                this.setState({
                                    reg: e.target.value
                                })
                            }}
                            error={Math.abs(this.state.reg) >= 0 ? false : true}
                            autoComplete='off'
                            id="margin-none"
                            placeholder='Registration Number'
                            fullWidth
                            className='text-field'
                            // helperText="You must provide your registration number"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />

                        <TextField
                            onChange={(e) => {
                                this.setState({
                                    captcha: e.target.value
                                })
                            }}
                            error={Math.abs(this.state.captcha) >= 0 ? false : true}
                            autoComplete='off'
                            id="margin-none"
                            placeholder='What is the sum of these two numbers?'
                            fullWidth
                            className='text-field'
                            helperText={`${this.state.firstNumber} + ${this.state.secondNumber}`}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />


                        <Button
                            variant="contained"
                            color="primary"
                            style={{marginTop: '5%', marginLeft: '30%', marginRight: '30%'}}
                            onClick={this.searchResult}
                        >
                            Search
                        </Button>

                        {
                            this.state.error &&
                            <Alert severity="error" style={{marginTop: '15px'}}>
                                Check everything again.
                            </Alert>
                        }

                    </div>
                }
                {
                    !this.state.firstNumber && !this.state.secondNumber &&
                    <div className='backdrop'>
                        <Backdrop open={true} className='the-real-backdrop'>
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                    </div>
                }
            </div>
        );
    }
};

export {
    EducationBoardResultBD as default
}

