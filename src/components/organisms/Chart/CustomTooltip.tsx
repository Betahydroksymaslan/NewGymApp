import { TooltipWrapper } from "./Chart.style";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <TooltipWrapper active={active}>
        <p>{payload[0].payload.treningi}</p>
      </TooltipWrapper>
    );
  }

  return null;
};

export default CustomTooltip;
