import * as React from 'react'       // React はソースコード内で使用していないが、JSXを使う場合、インポートが必要なので記述が必須
import { render } from 'react-dom'

const Main = (<h1>Markdorn Editor</h1>)

render(Main, document.getElementById('app'))