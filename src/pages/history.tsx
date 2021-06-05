import * as React from 'react'
import { useHistory } from 'react-router-dom' // React のカスタムフックで history オブジェクトを返す
import { Button } from '../components/button'

export const History: React.FC = () => {

  // useState などと同じように、レンダリング関数内で呼び出して戻り値を処理内で使用する
  const history = useHistory()

  return (
    <>
      <h1>History</h1>
      <Button onClick={() => history.push('/editor')}>
        エディタへ戻る
      </Button>
    </>
  )
}