import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
<% if (props.ui === 'ionic') { -%>
import { LoadingController, Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { forkJoin, from } from 'rxjs';
<% } -%>
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
<% if (props.ui === 'ionic') { -%>
              private platform: Platform,
              private loadingController: LoadingController,
<% } -%>
              private i18nService: I18nService,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() { }

  ngOnDestroy() { }

<% if (props.ui === 'ionic') { -%>
  async login() {
<% } else { -%>
  login() {
<% } -%>
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
<% if (props.ui === 'ionic') { -%>
    const loadingOverlay = await this.loadingController.create({});
    const loading$ = from(loadingOverlay.present());
    forkJoin([login$, loading$]).pipe(
      map(([credentials, ...rest]) => credentials),
<% } else { -%>
    login$.pipe(
<% } -%>
      finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
<% if (props.ui === 'ionic') { -%>
        loadingOverlay.dismiss();
<% } -%>
      }),
      untilDestroyed(this)
    ).subscribe(credentials => {
      log.debug(`${credentials.username} successfully logged in`);
      this.router.navigate([ this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
    }, error => {
      log.debug(`Login error: ${error}`);
      this.error = error;
    });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
<% if (props.ui === 'ionic') { -%>

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }
<% } -%>

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}
