import BASICINFO from './basicInfo'
import BODYINFO from './bodyInfo'
import { OVERWORKTABLE, OVERWORKSCORE } from './overworkTable'

interface USERDATA {
    basicInfo: BASICINFO
    bodyInfo: BODYINFO[]
    overworkTable: OVERWORKTABLE[]
    overworkScore: OVERWORKSCORE
}
export { USERDATA }
