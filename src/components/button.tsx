import * as React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;

  &.cancel {
    background: white;
    border: 1px solid gray;
    color: gray;
  }
`

//このコンポーネントに渡すパラメーターの型を定義
interface Props {
  cancel?: boolean     // cancel というパラメーターを指定しなくても良いという意味
  children: string     // ボタン内に表示するテキスト
  onClick: () => void  // ボタンをクリックした場合の処理関数
}

export const Button: React.FC<Props> = (props) => (
  <StyledButton onClick={props.onClick} className={props.cancel ? 'cancel' : ''}>
    {props.children}
  </StyledButton>
)