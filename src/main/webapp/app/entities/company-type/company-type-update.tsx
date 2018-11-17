import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './company-type.reducer';
import { ICompanyType } from 'app/shared/model/company-type.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompanyTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICompanyTypeUpdateState {
  isNew: boolean;
}

export class CompanyTypeUpdate extends React.Component<ICompanyTypeUpdateProps, ICompanyTypeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { companyTypeEntity } = this.props;
      const entity = {
        ...companyTypeEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/company-type');
  };

  render() {
    const { companyTypeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="talentPipeFrontendApp.companyType.home.createOrEditLabel">
              <Translate contentKey="talentPipeFrontendApp.companyType.home.createOrEditLabel">Create or edit a CompanyType</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : companyTypeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="company-type-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="talentPipeFrontendApp.companyType.name">Name</Translate>
                  </Label>
                  <AvField
                    id="company-type-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="normalizedNameLabel" for="normalizedName">
                    <Translate contentKey="talentPipeFrontendApp.companyType.normalizedName">Normalized Name</Translate>
                  </Label>
                  <AvField
                    id="company-type-normalizedName"
                    type="text"
                    name="normalizedName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="talentPipeFrontendApp.companyType.description">Description</Translate>
                  </Label>
                  <AvField id="company-type-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="minEmployeesQuantityLabel" for="minEmployeesQuantity">
                    <Translate contentKey="talentPipeFrontendApp.companyType.minEmployeesQuantity">Min Employees Quantity</Translate>
                  </Label>
                  <AvField
                    id="company-type-minEmployeesQuantity"
                    type="string"
                    className="form-control"
                    name="minEmployeesQuantity"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="maxEmployeesQuantityLabel" for="maxEmployeesQuantity">
                    <Translate contentKey="talentPipeFrontendApp.companyType.maxEmployeesQuantity">Max Employees Quantity</Translate>
                  </Label>
                  <AvField id="company-type-maxEmployeesQuantity" type="string" className="form-control" name="maxEmployeesQuantity" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/company-type" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  companyTypeEntity: storeState.companyType.entity,
  loading: storeState.companyType.loading,
  updating: storeState.companyType.updating,
  updateSuccess: storeState.companyType.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyTypeUpdate);
