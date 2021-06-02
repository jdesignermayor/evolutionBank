import { AuthService } from '../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  viewId = 1;
  userState: any;
  userDataByRouter: any;
  userDataByQuery: any;
  procedures: any;
  statusProcedures: any;

  constructor(private router: Router, private route: ActivatedRoute, private _auth: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((_) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.userDataByRouter = this.router.getCurrentNavigation()?.extras.state;
      }
    });
    this.getUserState();
  }

  onLoadStatus = (procedure: any) => {
    this.viewId = procedure.id;
    this.statusProcedures = procedure.status;
  }

  onSignOut = () => {
    this._auth.signOutProcess().then(() => {
      this.router.navigateByUrl('/sign-up');
    }).catch(() => {

    })
  }

  getUserState = () => {
    let userState = localStorage.getItem("userInformation");
    if (userState) {
      this.userState = JSON.parse(userState);
      this._auth.getUserData(this.userState.id).then(((res) => {
        this.userDataByQuery = res;
        this.procedures = this.userDataByQuery.procedures;
        this.onLoadStatus(this.procedures[0]);
      })).catch(() => {

      })
    } else {
      this.onSignOut();
    }
  };
}
