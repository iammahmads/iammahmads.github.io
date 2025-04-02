type stackCardProp = {
  name: string;
};

const StackCard = ({ name }: stackCardProp) => {
  return (
    <div className="bg-shadow text-primary px-2 py-1 inline-block m-1 rounded-lg hover:bg-primary hover:text-shadow cursor-default text-xs md:text-sm">
      <span>{name}</span>
    </div>
  );
};

export default StackCard;
