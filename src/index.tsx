import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import {
  HashRouter as Router, // HashRouter という要素を Router という名前で扱う
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Editor } from './pages/editor'
import { History } from './pages/history'

const GlobalStyle = createGlobalStyle`
    body * {
      box-sizing: border-box;
    }
  `

const Main = (
  <>
    <GlobalStyle />

    {/* この中に配置された要素をルーティングできる */}
    <Router>
      <Route exact path="/editor">
        <Editor />
      </Route>
      <Route exact path="/history">
        <History />
      </Route>

      {/* 定義されていないパスの場合は /editor にリダイレクトする、という定義 */}
      <Redirect to="/editor" path="*" />
    </Router>
  </>
)

render(Main, document.getElementById('app'))