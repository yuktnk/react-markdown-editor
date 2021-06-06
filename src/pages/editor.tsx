import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import * as ReactMarkdown from 'react-markdown'
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button'
import { SaveModal } from '../components/save_modal'
import { Link } from 'react-router-dom'
import { Header } from '../components/header'

const { useState } = React

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;  
`

const HeaderArea = styled.div`
  position: fixed;
  top: 0;
  right: 0;
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

  // モーダルを表示するかどうかのフラグ
  // 初期状態ではモーダルを出さないので、デフォルト値は false
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <HeaderArea>
        <Header title="Markdown Editor">
          <Button onClick={() => setShowModal(true)}>
            保存する
          </Button>
          <Link to="/history">
            履歴を見る
          </Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        <TextArea
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Preview>
          <ReactMarkdown>{text}</ReactMarkdown>
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
          onSave={(title: string): void => {
            putMemo(title, text)
            setShowModal(false)
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}