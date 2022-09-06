import styled from 'styled-components';

interface CheckboxType {
  isChecked: boolean;
}

export const Label = styled.label<CheckboxType>`
  position: relative;
  font-size: ${({ theme }) => theme.fontSize.m};
  padding-left: 40px;
  line-height: 1;

  &::before {
    content: '${({ isChecked }) => (isChecked ? '\\2714' : '')}';
    font-size: 22px;
    padding: 2px;
    width: 30px;
    height: 30px;
    transition: all 0.2s ease-in-out;
    background: ${({ isChecked, theme: { colors } }) =>
      isChecked ? colors.successDark : colors.white};
    color: ${({ isChecked, theme: { colors } }) => isChecked && colors.white};
    border: ${({ isChecked, theme }) =>
      isChecked
        ? `1px solid ${theme.colors.success}`
        : `1px solid ${theme.colors.fontDark}`};
    position: absolute;
    top: 50%;
    left: 0;
    border-radius: 5px;
    display: grid;
    place-items: center;
    transform: translateY(-50%);
  }
`;

export const Checkbox = styled.input.attrs((props) => ({
  type: 'checkbox',
}))`
  display: none;
`;