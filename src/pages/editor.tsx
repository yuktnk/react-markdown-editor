import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'

const Header = styled.header`
  font-size: 1.5rem;
  height: 2rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`

const Wrapper = styled.div`
  position: fixed;
  top: 3rem;
  right: 0;
  bottom: 0;
  left: 0;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  font-size: 1rem;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50vw;
`
// localStorage でデータの参照・保存に使うキー名を決める
// アプリケーション内で重複させないようにするため、今回は「ファイルパス:値の名前」という命名規則
const StorageKey = 'pages/editor:text'

// Editor という変数は React.FC という型であると、と定義
// React.FC は 関数コンポーネント（Function Component） の略
export const Editor: React.FC = () => {
  // 状態を管理する処理
  // localStorage.getItem は null を返す場合がある（初回アクセス時など）ので、 
  // || '' をつけて必ず文字列が入るようにする
  const [text, setText] = useStateWithStorage('', StorageKey)

  return (
    <>
      <Header>
        Markdown Editor
      </Header>
      <Wrapper>
        <TextArea
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Preview>プレビューエリア</Preview>
      </Wrapper>
    </>
  )
}