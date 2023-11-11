import { FC } from "react";
import { LoadingIcon } from "../../shared/components/loadingIcon";
import { useLabels } from "../hooks";

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({selectedLabels, onChange}) => {

  const labelsQuery = useLabels();
  if ( labelsQuery.labelsQuery.isLoading ) //! por que isLoading y no isFetching
    return (<LoadingIcon />);
  console.log(selectedLabels)
  return (
    <>
        {
           labelsQuery.labelsQuery.data?.map( label => (
            <span 
              key={ label.id }
              className={`badge rounded-pill m-1 label-picker ${ selectedLabels.includes(label.name) ? 'label-active' : '' }`}
              style={{ border: `1px solid #${label.color}`, color: `#${label.color}`}}
              onClick={() => onChange(label.name)}
            >
              {label.name}
            </span>
           ))
        }
        
    </>
  )
}
