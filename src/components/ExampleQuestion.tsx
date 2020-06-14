/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable quotes */
import React, { Component } from "react";

interface IExampleQuestionProps {
  passed?: any;
  failed?: any;
  terminate?: any;
}

interface IExampleQuestionState {
  score?: any;
}

export default class ExampleQuestion extends Component<
  IExampleQuestionProps,
  IExampleQuestionState
> {
  render() {
    // props includes special actions for passed({score:1.0}) and failed({score: 0.0 })
    // These are wrappers for cmi.passed and cmi.failed
    // that make sure cmi has initialized before score is actually sent
    // eslint-disable-next-line no-unused-vars
    const { passed, failed } = this.props;

    const onSubmit = (e: any) => {
      e.preventDefault();
      const { score } = this.state; // score was set when user chose a radio-button answer
      if (score > 0) {
        this.props.passed(score);
      } else {
        this.props.failed(score);
      }
      this.props.terminate(); // MUST call terminate to end the session
    };

    const onSelectAnswer = (e: any) => {
      this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        ...this.state,
        score: e.target.value,
      });
      // console.log(`score: ${e.target.value}`)
    };

    return (
      <form>
        <div className="row">
          <div className="col-lg-1 col-md-1 col-sm-1">
            <div>1 + 1 = ?</div>
            <div className="form-group">
              <label htmlFor="r1">
                <span>0</span>
                <input
                  type="radio"
                  id="r1"
                  className="form-control"
                  name="answer"
                  value="0"
                  onChange={(e) => onSelectAnswer(e)}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="r2">
                <span>1</span>
                <input
                  type="radio"
                  id="r2"
                  className="form-control"
                  name="answer"
                  value="0"
                  onChange={(e) => onSelectAnswer(e)}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="r3">
                <span>2</span>
                <input
                  type="radio"
                  id="r3"
                  className="form-control"
                  name="answer"
                  value="1"
                  onChange={(e) => onSelectAnswer(e)}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="r4">
                <span>3</span>
                <input
                  type="radio"
                  id="r4"
                  className="form-control"
                  name="answer"
                  value="0"
                  onChange={(e) => onSelectAnswer(e)}
                />
              </label>
            </div>
            <div className="form-group">
              <button onClick={onSubmit} type="submit">
                submit
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
