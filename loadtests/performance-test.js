import { sleep, check} from"k6";
import http from "k6/http";

export let options = {
  stages:[
    {duration : '30s', target: 30},
    {duration : '30s', target: 30},
    {duration : '30s', target : 60},
    {duration : '30s', target: 0},
  ],
  thresholds: {
    http_req_duration: ["p(95)<8000"] // 95 percent of response times must be below 8000ms
  }
};

export function setup(){
  var url = "https://1gggg6k91a.execute-api.us-east-2.amazonaws.com/salaryloans/auth/user"
  var payload = JSON.stringify(
      {
          "password": "Asdf2018",
          "id": "1022372128"
      }
  );

  var headers = {
      headers:{
          'Content-Type': 'application/json'
      }
  }

  var result = http.post(url, payload, headers);
  console.log(result.body)

  return{
      authResponse : JSON.parse(result.body)
  }
}

export default function (data){
    
  var url = "https://1gggg6k91a.execute-api.us-east-2.amazonaws.com/salaryloans/api/back-office/renewals?idCaptureResult=&identificationNumber=500001"
  let headers = {
      headers: {
          'Authorization': data.authResponse.token
      }
  }

  var result = http.get(url, headers);
  check(result, {
      'status was 200': r => r.status == 200
  })
  sleep(1);
}
