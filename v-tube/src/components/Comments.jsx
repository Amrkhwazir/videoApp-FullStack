import styled from '@emotion/styled';
import React from 'react';
import { SingleComment } from './SingleComment';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 0.5px solid ${({theme}) => theme.textSoft};
  background: transparent;
  padding: 5px;
  outline: none;
  width: 100%;
`;

export const Comments = () => {
  return (
    <Container>
        <NewComment>
            <Avatar src='https://th.bing.com/th?q=Chart+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-WW&cc=PK&setlang=en&adlt=moderate&t=1&mw=247' />
            <Input placeholder='Add a comment...'/>
        </NewComment>
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
    </Container>
  )
}
