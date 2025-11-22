import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const DatePicker = ({ selectedDate, onDateChange }: { selectedDate: Date | undefined, onDateChange: (date: Date) => void}) => {
  return (
    <div className="custom-datepicker">
      <style>{`
        .custom-datepicker .rdp {
          --rdp-accent-color: #10b981; /* Color principal (botones, seleccionados) */
        }

        /* Modo oscuro */
        @media (prefers-color-scheme: dark) {
          .custom-datepicker .rdp {
            --rdp-accent-color: #34d399;
            
          }
        }

       
      `}</style>
      <DayPicker 
        mode="single"
        className="rdp"
        selected={selectedDate}
        onSelect={(date) =>onDateChange(date!)}
      />
    </div>
  );
};

export default DatePicker;