/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
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
  knowledgeComponents: any;
}

export default class AuSendsMultipleScoresInResult extends Component<
  IExampleQuestionProps,
  IExampleQuestionState
> {
  constructor(props: IExampleQuestionProps) {
    super(props);
    this.state = {
      knowledgeComponents: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
      },
    };
    this.onKnowledgeComponentScoreUpdated = this.onKnowledgeComponentScoreUpdated.bind(
      // eslint-disable-next-line comma-dangle
      this
    );
  }

  onKnowledgeComponentScoreUpdated(topicId: any, event: any) {
    const score = event.target.value / 100.0;
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state,
      knowledgeComponents: {
        // eslint-disable-next-line react/no-access-state-in-setstate
        ...this.state.knowledgeComponents,
        [topicId]: score,
      },
    });
  }

  render() {
    // props includes special actions for passed({score:1.0}) and failed({score: 0.0 })
    // These are wrappers for cmi.passed and cmi.failed
    // that make sure cmi has initialized before score is actually sent
    const { passed, failed, terminate } = this.props;

    const onSubmit = () => {
      // just make the score the avg of all the knowledge-component scores
      const score = Object.getOwnPropertyNames(
        // eslint-disable-next-line comma-dangle
        this.state.knowledgeComponents
        // eslint-disable-next-line arrow-body-style
      ).reduce((acc, cur, i) => {
        return (acc * i + this.state.knowledgeComponents[cur]) / (i + 1);
      }, 0);

      const extensions = {
        "https://pal.ict.usc.edu/xapi/vocab/exts/result/kc-scores": Object.getOwnPropertyNames(
          // eslint-disable-next-line comma-dangle
          this.state.knowledgeComponents
        ).reduce(
          (acc: any, cur: any) => [
            ...acc,
            {
              kc: cur, // just for reference, in this extension domain,
              // 'kc' is a knowledge component
              score: this.state.knowledgeComponents[cur],
            },
          ],
          []
        ),
      };
      if (score > 0) {
        passed(score, extensions);
      } else {
        failed(score, extensions);
      }

      terminate();
    };
    return (
      <form>
        <div className="row">
          <div className="col-lg-1 col-md-1 col-sm-1">
            <div>KNOWLEDGE-0COMPONENT SCORES:</div>
            <div className="form-group">
              // eslint-disable-next-line arrow-body-style
              {["a", "b", "c", "d"].map((id) => (
                <div key={id}>
                  <label htmlFor={id}>
                    Knowledge Component
                    {id.toUpperCase()}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={this.state.knowledgeComponents[id] * 100.0 || 0}
                    className="slider"
                    id={id}
                    onChange={
                      (e) =>
                        // eslint-disable-next-line implicit-arrow-linebreak
                        this.onKnowledgeComponentScoreUpdated(id, e)
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                  />
                  <label htmlFor={id}>
                    :{this.state.knowledgeComponents[id] || 0}
                  </label>
                </div>
              ))}
            </div>
            <div className="form-group">
              <button id="submitbutton" className="btn" onClick={onSubmit}>
                submit
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
