import { ProductAttribute } from "@/types"
import { ProductRating } from "tp-kit/components"
import styles from '../app/product-attributes-table.module.css'

type Props = {
    attributes : ProductAttribute[]
}

export default function ProductAttributeTable({attributes} : Props) {
    return (
        <table className={styles.table}>
            <tbody>
            {attributes.map( (attribute,index) =><tr>
                <td>{attribute.label}</td>
                <td><ProductRating icon="circle" value={attribute.rating}/></td>
            </tr>)}
            </tbody>

        </table>
    )
}