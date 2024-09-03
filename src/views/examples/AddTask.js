// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0" >
          <CardBody className="px-lg-5 py-lg-5" style={{backgroundColor:"#eee", borderRadius:"15px"}}>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Description"
                    type="text"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="customCheck5"
                  type="checkbox"
                />
                <label className="custom-control-label" htmlFor="customCheck5">
                  Divisible task
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button">
                  Add Task
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
