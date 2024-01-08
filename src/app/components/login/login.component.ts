import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email = ''
  linkSuccess = false

  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    ) {
      this.auth.currentUser.subscribe((user) => {
        if(user) this.router.navigateByUrl('/workspace', { replaceUrl: true })
      })
    }

  ngOnInit(): void {}

  async signIn() {
      this.spinner.show()

      const result = await this.auth.login(this.email)
      console.log(result)

      this.spinner.hide()

      if (!result.error) this.linkSuccess = true
      else alert(result.error.message)
  }
}
