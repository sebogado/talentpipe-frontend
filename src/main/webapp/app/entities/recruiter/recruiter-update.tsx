import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICity } from 'app/shared/model/city.model';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { ISector } from 'app/shared/model/sector.model';
import { getEntities as getSectors } from 'app/entities/sector/sector.reducer';
import { getEntity, updateEntity, createEntity, reset } from './recruiter.reducer';
import { IRecruiter } from 'app/shared/model/recruiter.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecruiterUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRecruiterUpdateState {
  isNew: boolean;
  cityId: string;
  sectorId: string;
}

export class RecruiterUpdate extends React.Component<IRecruiterUpdateProps, IRecruiterUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cityId: '0',
      sectorId: '0',
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

    this.props.getCities();
    this.props.getSectors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { recruiterEntity } = this.props;
      const entity = {
        ...recruiterEntity,
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
    this.props.history.push('/entity/recruiter');
  };

  render() {
    const { recruiterEntity, cities, sectors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="talentPipeFrontendApp.recruiter.home.createOrEditLabel">
              <Translate contentKey="talentPipeFrontendApp.recruiter.home.createOrEditLabel">Create or edit a Recruiter</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : recruiterEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="recruiter-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="talentPipeFrontendApp.recruiter.name">Name</Translate>
                  </Label>
                  <AvField
                    id="recruiter-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="lastName">
                    <Translate contentKey="talentPipeFrontendApp.recruiter.lastName">Last Name</Translate>
                  </Label>
                  <AvField
                    id="recruiter-lastName"
                    type="text"
                    name="lastName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    <Translate contentKey="talentPipeFrontendApp.recruiter.email">Email</Translate>
                  </Label>
                  <AvField
                    id="recruiter-email"
                    type="text"
                    name="email"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="taxIdLabel" for="taxId">
                    <Translate contentKey="talentPipeFrontendApp.recruiter.taxId">Tax Id</Translate>
                  </Label>
                  <AvField
                    id="recruiter-taxId"
                    type="text"
                    name="taxId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    <Translate contentKey="talentPipeFrontendApp.recruiter.phone">Phone</Translate>
                  </Label>
                  <AvField
                    id="recruiter-phone"
                    type="text"
                    name="phone"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="streetLabel" for="street">
                    <Translate contentKey="talentPipeFrontendApp.recruiter.street">Street</Translate>
                  </Label>
                  <AvField
                    id="recruiter-street"
                    type="text"
                    name="street"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="numberLabel" for="number">
                    <Translate contentKey="talentPipeFrontendApp.recruiter.number">Number</Translate>
                  </Label>
                  <AvField
                    id="recruiter-number"
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
                  <Label id="floorLabel" for="floor">
                    <Translate contentKey="talentPipeFrontendApp.recruiter.floor">Floor</Translate>
                  </Label>
                  <AvField
                    id="recruiter-floor"
                    type="string"
                    className="form-control"
                    name="floor"
                    validate={{
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      max: { value: 400, errorMessage: translate('entity.validation.max', { max: 400 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="apartmentLabel" for="apartment">
                    <Translate contentKey="talentPipeFrontendApp.recruiter.apartment">Apartment</Translate>
                  </Label>
                  <AvField id="recruiter-apartment" type="text" name="apartment" />
                </AvGroup>
                <AvGroup>
                  <Label for="city.name">
                    <Translate contentKey="talentPipeFrontendApp.recruiter.city">City</Translate>
                  </Label>
                  <AvInput
                    id="recruiter-city"
                    type="select"
                    className="form-control"
                    name="city.id"
                    value={isNew ? cities[0] && cities[0].id : recruiterEntity.city.id}
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
                  <Label for="sector.name">
                    <Translate contentKey="talentPipeFrontendApp.recruiter.sector">Sector</Translate>
                  </Label>
                  <AvInput id="recruiter-sector" type="select" className="form-control" name="sector.id">
                    <option value="" key="0" />
                    {sectors
                      ? sectors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/recruiter" replace color="info">
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
  cities: storeState.city.entities,
  sectors: storeState.sector.entities,
  recruiterEntity: storeState.recruiter.entity,
  loading: storeState.recruiter.loading,
  updating: storeState.recruiter.updating,
  updateSuccess: storeState.recruiter.updateSuccess
});

const mapDispatchToProps = {
  getCities,
  getSectors,
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
)(RecruiterUpdate);
