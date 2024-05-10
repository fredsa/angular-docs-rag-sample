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

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GenerativeLanguageService {
  private URL = 'http://127.0.0.1:5001/chatbot-demo-7e376/us-central1/generate_aqa_answer';

  constructor(private http: HttpClient) {}

  async getAQAAnswer(prompt: string): Promise<Observable<AQAResponse>> {
    return this.http.get<AQAResponse>(`${this.URL}?text=${prompt}`);
  }
}
export interface AQAResponse {
  answer: string;
  probability: Number;
  url: string;
  questions?: string[];
}
