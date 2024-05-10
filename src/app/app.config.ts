/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideMarkdown} from 'ngx-markdown';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {USE_EMULATOR} from '@angular/fire/compat/functions'; // comment out to run in the cloud
import {provideHttpClient} from '@angular/common/http';
import {connectFunctionsEmulator, getFunctions, provideFunctions} from '@angular/fire/functions';
import {environment} from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideMarkdown(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          'projectId': 'chatbot-demo-7e376',
          // appId: '',
          // storageBucket: '',
          // apiKey: '',
          // authDomain: '',
          // messagingSenderId: '',
        }),
      ),
    ),
    importProvidersFrom(
      provideFunctions(() => {
        const functions = getFunctions();
        if (environment.useEmulators) {
          connectFunctionsEmulator(functions, 'localhost', 5001);
        }
        return functions;
      }),
    ),
  ],
};
