export default (props: any) => (
  <div
    style={{
      background: '#16212d',
      borderRadius: '0.5rem',
      padding: '1rem 1.25rem',
      color: 'white',
    }}
  >
    {props.children}
  </div>
);
