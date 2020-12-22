type Props = {
  withLine?: boolean;
};

export function Divider({withLine}: Props) {
  if (withLine) {
    return (
      <>
        <div className="border-t mt-2 border-gray-800" />
        <div className="mb-2" />
      </>
    );
  }
  return <div className="my-2" />;
}
