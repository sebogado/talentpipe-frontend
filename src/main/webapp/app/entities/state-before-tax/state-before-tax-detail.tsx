import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './state-before-tax.reducer';
import { IStateBeforeTax } from 'app/shared/model/state-before-tax.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStateBeforeTaxDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StateBeforeTaxDetail extends React.Component<IStateBeforeTaxDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { stateBeforeTaxEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentPipeFrontendApp.stateBeforeTax.detail.title">StateBeforeTax</Translate> [<b>
              {stateBeforeTaxEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="talentPipeFrontendApp.stateBeforeTax.name">Name</Translate>
              </span>
            </dt>
            <dd>{stateBeforeTaxEntity.name}</dd>
            <dt>
              <span id="normalizedName">
                <Translate contentKey="talentPipeFrontendApp.stateBeforeTax.normalizedName">Normalized Name</Translate>
              </span>
            </dt>
            <dd>{stateBeforeTaxEntity.normalizedName}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="talentPipeFrontendApp.stateBeforeTax.description">Description</Translate>
              </span>
            </dt>
            <dd>{stateBeforeTaxEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/state-before-tax" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/state-before-tax/${stateBeforeTaxEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ stateBeforeTax }: IRootState) => ({
  stateBeforeTaxEntity: stateBeforeTax.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateBeforeTaxDetail);
