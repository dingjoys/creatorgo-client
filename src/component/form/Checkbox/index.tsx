import './index.scss';
import { ReactComponent as IconChecked } from '@/component/icons/svg/checked-squre.svg';
interface Props {
    value: boolean;
    disabled?: boolean;
    size?: string;
    onChange?: (newValue: boolean) => void;
    shape?: 'round' | 'square';
}
export function Checkbox({ value, onChange, disabled, size, shape = 'round' }: Props) {
    return (
        <div
            className={'global-checkbox' + (disabled ? ' disabled' : '')}
            style={{
                width: size ?? '16px',
                height: size ?? '16px',
            }}
            onClick={() => {
                !disabled && onChange && onChange(!value);
            }}
        >
            {value ? (
                <IconChecked width={size ?? '16px'} height={size ?? '16px'} />
            ) : (
                <div
                    className="global-check-inner"
                    style={{
                        borderRadius: shape === 'round' ? '100%' : '2px',
                    }}
                ></div>
            )}
        </div>
    );
}
