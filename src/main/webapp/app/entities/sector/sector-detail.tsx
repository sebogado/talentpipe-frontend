import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sector.reducer';
import { ISector } from 'app/shared/model/sector.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISectorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SectorDetail extends React.Component<ISectorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { sectorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentpipeApp.sector.detail.title">Sector</Translate> [<b>{sectorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="talentpipeApp.sector.name">Name</Translate>
              </span>
            </dt>
            <dd>{sectorEntity.name}</dd>
            <dt>
              <span id="normalizedName">
                <Translate contentKey="talentpipeApp.sector.normalizedName">Normalized Name</Translate>
              </span>
            </dt>
            <dd>{sectorEntity.normalizedName}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="talentpipeApp.sector.description">Description</Translate>
              </span>
            </dt>
            <dd>{sectorEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/sector" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/sector/${sectorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ sector }: IRootState) => ({
  sectorEntity: sector.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectorDetail);
