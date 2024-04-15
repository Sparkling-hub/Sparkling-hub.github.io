import { initializeApp, getApp, getApps } from "firebase-admin/app"; 
import admin from "firebase-admin";

const serviceAccount  = {
  "type": process.env.SERVICE_TYPE,
  "project_id": "sparkling-website",
  "private_key_id": "69cfa3683299e551d32b07f06655a565a397329a",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDBRDa81Ib/SvN\n0Ekngqq0/Qi54xOJaaHpjFqQGKhJJbs/3U6nhLVX0Fiwb89KFQE39jEfDsXFO4w9\nVKhfDW0lJkEVIriSXDmHkqtnKI7eHDRB0ZDOa1XAdy24+jeyE91nJpbxi4DFkULI\nufH3tuUa7ss6u3asCtg+2qhwkjUPpIg+5lhZL9GFGX58K3/yx0X2zrZTzZB4YCBn\nSK/hstYdY58TG25Zb2EQgtfHUuoV4DQ+AqFAGat9v65kZfmDJfRLXm3RcOcwMxiw\njEPLsEWmJxQHdbkq9HOKswftRX7FxdL4B/jJWeDtve8dlM/e6sYINFb54Rc75y+L\n6P9yr1i5AgMBAAECggEAOCMQLAaYnyfsYQ1Q0YfCfeDMjz23VPnMOr9FHm+Kmau7\nz/Fzf7MqxEFcFkXJJKkRNbuvfiIxecnfX5Qr91iVD3mIiH37JV5YzRbCMiqxnWv+\n+udJSLIK+CEWT0XvnFothFDOaG9gvP5IfCFSbpz+LBeK9rgZvAJPJyCoFedwULTq\nMegYVVwCBazKvvNEoaZfmyUGH0KQcjitie0zepqAERJnVmBJwtuRtftvYwclWeor\nPmA9LiPRzYTFXvvS4/F3OQ7q/WpZX3hX5nb3NUFlqgWcisJ73Y/X0VniYvVE9e71\nnuDxpuFzF/yoqZIXyuZU6AoLNm2byw0f4jzYrtn5NQKBgQDm/zGBCnUa+y8933+0\nu5LNcKIY92rP9j+F97/pajJbd9wyYeHgNlMLr8XUUqZ+LyiDAsIvB5oN7UxU6eF4\nm8+toY90nitHJUWMrVZjhN9OP+sX/YdoH8p7yE0ab7bEoBIudGKqW+0efzWH1UWg\nOwirv9fiPZdJXC5Tal31pu+9fwKBgQDYIPdYSQL+7QwTss3Ae5kk2AVFdqXtkF/Q\n6VRZM/a4Sa4e9zl40QjB+NEGPrKvjCFK7sAiH/M/QtJh6LDMTWSXGYr1nP323d2O\nasQHALD7ljpgJ2scweOrZdOzJ5vyDagWQtPG2dXD6yaDc2zDlN98fAXxc7DP1Sbx\nArA4r0h1xwKBgCz/48XuopeJ/U8BXiB4NgX9fiZ89HrkzsUrWWCARqUY+XV7KgSC\nsLTjHhfZrgOA7lRvUiLVSUaTRr53/WuAdvmtMoQWV/n5Ic5g6iZi+RmGTCcVRa6c\nGtb4U0TmJGWzhTc1hw8G7290epomivTG606CBe1V8EXjRkcLvpgfWC7DAoGBAJkz\nLQE4p9X6Q8BG00/ojNKwCXSGuPFfkHuumWqtyeox2Cn9BpEcYz/T1p69nL2Q8ByE\nhk7qJOunuydJ4ODAz1fH9FdL1D3EYQNNrOxl0g5UG8cCygtVaMOa52gr4H/ArHAz\nKJjg2oUIz4EINYWhppU/+JqBbki0B+l5BV746L0LAoGBANAJa8ah0V1uA42yP0wa\nnfkrpP9qw6POZkSvKFaqS9T9htbgKgojIT6ViPW+MMWHrA+02+dxBS17gvkhOWkp\nHvAIafFRxD0PScFujgLzFOWBAKGGPQea08DeeQWrnM+GWG6aUouicW380rF5zMDj\n7PkAuUfdauh2XXrFA4nj/MlJ\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-tf5f3@sparkling-website.iam.gserviceaccount.com",
  "client_id": "107235330424912187934",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tf5f3%40sparkling-website.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
const firebaseConfig = {
  "credential": admin.credential.cert(serviceAccount),
  "apiKey": "AIzaSyBJKXMOYI6KodbnJhJHAH3wsjFznYhQ-pw",
  "authDomain": "sparkling-website.firebaseapp.com",
  "projectId": "sparkling-website",
  "storageBucket": "sparkling-website.appspot.com",
  "messagingSenderId": "450613401211",
  "appId": "1:450613401211:web:fa8b1b0c3511e9b1da34de",
  "measurementId": "G-RB288H6HFL"
}
  



export function firebaseGetApp(){
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

};