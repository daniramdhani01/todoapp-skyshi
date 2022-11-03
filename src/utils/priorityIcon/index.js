import high from '../../icon/priority/high.svg'
import low from '../../icon/priority/low.svg'
import medium from '../../icon/priority/medium.svg'
import veryHigh from '../../icon/priority/very-high.svg'
import veryLow from '../../icon/priority/very-low.svg'

export const priorityIcon = (priority) => {
    let icon
    // eslint-disable-next-line default-case
    switch (priority) {
      case 'very-low':
        icon = veryLow
        break;
      case 'low':
        icon = low
        break;
      case 'normal':
        icon = medium
        break;
      case 'high':
        icon = high
        break;
      case 'very-high':
        icon = veryHigh
        break;
    }
    return icon
  }