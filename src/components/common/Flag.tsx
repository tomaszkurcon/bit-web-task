import { Languages } from "../../enums/Languages";
import { NO, SE, GB, Props as IconProps } from "country-flag-icons/react/3x2";

type TFlagWithNameProps = {
  language: Languages;
} & IconProps;
const Flag = ({ language, ...props }: TFlagWithNameProps) => {
  switch (language) {
    case Languages.NO:
      return <NO {...props} />;
    case Languages.EN:
      return <GB {...props} />;
    case Languages.SE:
      return <SE {...props} />;
  }
};

export default Flag;
