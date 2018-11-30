import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ISector } from 'app/shared/model/sector.model';
import { getEntities as getSectors } from 'app/entities/sector/sector.reducer';
import { ICity } from 'app/shared/model/city.model';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { ICompanyType } from 'app/shared/model/company-type.model';
import { getEntities as getCompanyTypes } from 'app/entities/company-type/company-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompanyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICompanyUpdateState {
  isNew: boolean;
  mainUserId: string;
  sectorId: string;
  cityId: string;
  companyTypeId: string;
}

export class CompanyUpdate extends React.Component<ICompanyUpdateProps, ICompanyUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      mainUserId: '0',
      sectorId: '0',
      cityId: '0',
      companyTypeId: '0',
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

    this.props.getUsers();
    this.props.getSectors();
    this.props.getCities();
    this.props.getCompanyTypes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { companyEntity } = this.props;
      const entity = {
        ...companyEntity,
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
    this.props.history.push('/entity/company');
  };

  render() {
    const { companyEntity, users, sectors, cities, companyTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="talentPipeFrontendApp.company.home.createOrEditLabel">
              <Translate contentKey="talentPipeFrontendApp.company.home.createOrEditLabel">Create or edit a Company</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : companyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="company-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="taxNameLabel" for="taxName">
                    <Translate contentKey="talentPipeFrontendApp.company.taxName">Tax Name</Translate>
                  </Label>
                  <AvField
                    id="company-taxName"
                    type="text"
                    name="taxName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="taxIdLabel" for="taxId">
                    <Translate contentKey="talentPipeFrontendApp.company.taxId">Tax Id</Translate>
                  </Label>
                  <AvField
                    id="company-taxId"
                    type="text"
                    name="taxId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    <Translate contentKey="talentPipeFrontendApp.company.email">Email</Translate>
                  </Label>
                  <AvField
                    id="company-email"
                    type="text"
                    name="email"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="talentPipeFrontendApp.company.name">Name</Translate>
                  </Label>
                  <AvField id="company-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="streetLabel" for="street">
                    <Translate contentKey="talentPipeFrontendApp.company.street">Street</Translate>
                  </Label>
                  <AvField
                    id="company-street"
                    type="text"
                    name="street"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="floorLabel" for="floor">
                    <Translate contentKey="talentPipeFrontendApp.company.floor">Floor</Translate>
                  </Label>
                  <AvField id="company-floor" type="string" className="form-control" name="floor" />
                </AvGroup>
                <AvGroup>
                  <Label id="numberLabel" for="number">
                    <Translate contentKey="talentPipeFrontendApp.company.number">Number</Translate>
                  </Label>
                  <AvField
                    id="company-number"
                    type="string"
                    className="form-control"
                    name="number"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="apartmentLabel" for="apartment">
                    <Translate contentKey="talentPipeFrontendApp.company.apartment">Apartment</Translate>
                  </Label>
                  <AvField id="company-apartment" type="text" name="apartment" />
                </AvGroup>
                <AvGroup>
                  <Label id="postalCodeLabel" for="postalCode">
                    <Translate contentKey="talentPipeFrontendApp.company.postalCode">Postal Code</Translate>
                  </Label>
                  <AvField
                    id="company-postalCode"
                    type="text"
                    name="postalCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    <Translate contentKey="talentPipeFrontendApp.company.phone">Phone</Translate>
                  </Label>
                  <AvField
                    id="company-phone"
                    type="text"
                    name="phone"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="contactNameLabel" for="contactName">
                    <Translate contentKey="talentPipeFrontendApp.company.contactName">Contact Name</Translate>
                  </Label>
                  <AvField
                    id="company-contactName"
                    type="text"
                    name="contactName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="mainUser.login">
                    <Translate contentKey="talentPipeFrontendApp.company.mainUser">Main User</Translate>
                  </Label>
                  <AvInput
                    id="company-mainUser"
                    type="select"
                    className="form-control"
                    name="mainUser.id"
                    value={isNew ? users[0] && users[0].id : companyEntity.mainUser.id}
                  >
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="sector.name">
                    <Translate contentKey="talentPipeFrontendApp.company.sector">Sector</Translate>
                  </Label>
                  <AvInput
                    id="company-sector"
                    type="select"
                    className="form-control"
                    name="sector.id"
                    value={isNew ? sectors[0] && sectors[0].id : companyEntity.sector.id}
                  >
                    {sectors
                      ? sectors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="city.name">
                    <Translate contentKey="talentPipeFrontendApp.company.city">City</Translate>
                  </Label>
                  <AvInput
                    id="company-city"
                    type="select"
                    className="form-control"
                    name="city.id"
                    value={isNew ? cities[0] && cities[0].id : companyEntity.city.id}
                  >
                    {cities
                      ? cities.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="companyType.name">
                    <Translate contentKey="talentPipeFrontendApp.company.companyType">Company Type</Translate>
                  </Label>
                  <AvInput
                    id="company-companyType"
                    type="select"
                    className="form-control"
                    name="companyType.id"
                    value={isNew ? companyTypes[0] && companyTypes[0].id : companyEntity.companyType.id}
                  >
                    {companyTypes
                      ? companyTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/company" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
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
  users: storeState.userManagement.users,
  sectors: storeState.sector.entities,
  cities: storeState.city.entities,
  companyTypes: storeState.companyType.entities,
  companyEntity: storeState.company.entity,
  loading: storeState.company.loading,
  updating: storeState.company.updating,
  updateSuccess: storeState.company.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getSectors,
  getCities,
  getCompanyTypes,
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
)(CompanyUpdate);
