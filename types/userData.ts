import BASICINFO from './basicInfo'
import BODYINFO from './bodyInfo'
import OVERWORKSCORE from './overworkScore'

export default interface USERDATA {
    basicInfo: BASICINFO
    bodyInfo: BODYINFO[]
    overworkScore: OVERWORKSCORE[]
}
