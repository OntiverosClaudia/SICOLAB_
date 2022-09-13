export const styleSelect = {
  container: (styles) => ({
    ...styles,
    borderRadius: '30px 30px 30px 30x',
  }),
  control: (base, state) => ({
    ...base,
    borderRadius: state.isFocused ? '10px 10px 0px 0px' : 5,
    width: '100%',
    height: '35px',
    overflow: 'auto',
    border: '1px solid hsl(0, 0%, 80%)',
    boxShadow: '0px 0px 1px hsl(0, 0%, 80%)',
    '&:hover': {
      border: '1px solid #5fa2db',
      boxShadow: '0px 0px 6px #5fa2db',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0px 0px 10px 10px',
    margin: 0,
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? '#5fa2db' : null,
    color: isFocused ? '#fff' : '#333',
  }),
};
