import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import * as ReactMarkdown from 'react-markdown'
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button'
import { SaveModal } from '../components/save_modal'
import { Link } from 'react-router-dom'

const { useState } = React

const Header = styled.header`
  align-content: center;
  display: flex;
  font-size: 1.5rem;
  height: 2rem;
  justify-content: space-between;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`

const HeaderControl = styled.div`
height: 2rem;
display: flex;
align-content: center;
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

  // モーダルを表示するかどうかのフラグ
  // 初期状態ではモーダルを出さないので、デフォルト値は false
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Header>
        Markdown Editor
        <HeaderControl>
          <Button onClick={() => setShowModal(true)}>
            保存する
          </Button>
          <Link to="/history">
            履歴を見る
          </Link>
        </HeaderControl>
      </Header>
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