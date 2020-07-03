/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React from "react";
// @ts-ignore
import Cmi5AU from "react-cmi5";
import SingleQuestionAu from "./single-question-au";
import AuSendsMultipleScoresInResult from "./au-sends-multiple-scores-in-result";

const Cmi5App = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const endpoint = urlParams.get("endpoint");
  const fetch = urlParams.get("fetch");
  const registration = urlParams.get("registration");
  const activityid = urlParams.get("activityid");
  const actor = urlParams.get("actor");

  console.log('--------');
  console.log('endpoint:', endpoint);
  console.log('fetch:', fetch);
  console.log('registration:', registration);
  console.log('activityid:', activityid);
  console.log('actor:', actor);

  // cmi5Controller.setEndPoint(urlParams.get("endpoint"));
  // cmi5Controller.setFetchUrl(urlParams.get("fetch"));
  // cmi5Controller.setRegistration(urlParams.get("registration"));
  // cmi5Controller.setActivityId(urlParams.get("activityid"));
  // cmi5Controller.setActor(urlParams.get("actor"));

  return (
    <Cmi5AU>
      <SingleQuestionAu />
      <AuSendsMultipleScoresInResult />
    </Cmi5AU>
  );
};
export default Cmi5App;
