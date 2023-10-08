import { Row, Space } from "antd"

const notFound = () => {
    return (
        <Row
            justify="center"
            align="middle"
            style={{ height: "100vh" }}
        >
            <Space>
                404!! Page not Found!
            </Space>
        </Row>
    )
}

export default notFound