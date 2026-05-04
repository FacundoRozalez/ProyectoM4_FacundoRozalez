export const Badge = ({ text, color }: { text: string; color: string }) => (
  <span style={{
    fontSize: '11px',
    fontWeight: 'bold',
    padding: '2px 8px',
    borderRadius: '12px',
    backgroundColor: color,
    color: 'white',
    textTransform: 'uppercase'
  }}>
    {text}
  </span>
);