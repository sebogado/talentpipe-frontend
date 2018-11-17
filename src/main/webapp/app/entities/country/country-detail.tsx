import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './country.reducer';
import { ICountry } from 'app/shared/model/country.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICountryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CountryDetail extends React.Component<ICountryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { countryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentPipeFrontendApp.country.detail.title">Country</Translate> [<b>{countryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="talentPipeFrontendApp.country.name">Name</Translate>
              </span>
            </dt>
            <dd>{countryEntity.name}</dd>
            <dt>
              <span id="normalizedName">
                <Translate contentKey="talentPipeFrontendApp.country.normalizedName">Normalized Name</Translate>
              </span>
            </dt>
            <dd>{countryEntity.normalizedName}</dd>
            <dt>
              <span id="code">
                <Translate contentKey="talentPipeFrontendApp.country.code">Code</Translate>
              </span>
            </dt>
            <dd>{countryEntity.code}</dd>
            <dt>
              <span id="phoneCode">
                <Translate contentKey="talentPipeFrontendApp.country.phoneCode">Phone Code</Translate>
              </span>
            </dt>
            <dd>{countryEntity.phoneCode}</dd>
            <dt>
              <span id="currency">
                <Translate contentKey="talentPipeFrontendApp.country.currency">Currency</Translate>
              </span>
            </dt>
            <dd>{countryEntity.currency}</dd>
          </dl>
          <Button tag={Link} to="/entity/country" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/country/${countryEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ country }: IRootState) => ({
  countryEntity: country.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryDetail);
